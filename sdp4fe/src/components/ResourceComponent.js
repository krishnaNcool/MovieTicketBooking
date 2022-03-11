import React, { PureComponent, useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery, gql } from "@apollo/client";

const RESOURCE_QUERY = gql`
query GetResource {
   level1Teams(options:{sort:{id:DESC}}) {
    name
    resourceDistribution:cumulativeResourceDistributionRounded
    swimlane{
      name
      taskFillHex
    }
   }
   times{
    dayCount
  }
  milestones(where:{number:"M0007"}){
    startDay
  }
}`;

function ResourceComponent() {

    const { data, loading, error } = useQuery(RESOURCE_QUERY);
    const [graph, setGraph] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamColor, setTeamColor] = useState({});

    const buildGraph = (level1Teams = [], pivot) => {
        let interval = 20;
        let result = [];
        level1Teams.forEach(team => {
            const resources = team.resourceDistribution;
            const teamName = team.name;
            let xaxis = 0;

            for (let i = pivot - 1; i >= -interval; i = i - interval) {
                let index = i;
                let window = i + interval;
                if (i < 0) { index = 0; window = Math.abs(i + 1); }
                let obj = result.find(r => r.period === xaxis.toString());
                if (obj) {
                    obj[teamName] = Math.max(...resources.slice(index, window))
                }
                else
                    result.push({ period: xaxis.toString(), [teamName]: Math.max(...resources.slice(index, window)) });
                xaxis--;
            }
            result = [...result.reverse()];
            xaxis = 0;
            for (let i = pivot - 1; i < resources.length; i = i + interval) {
                let obj = result.find(r => r.period === xaxis.toString());
                if (obj) {
                    obj[teamName] = Math.max(...resources.slice(i, i + interval))
                }
                else
                    result.push({ period: xaxis.toString(), [teamName]: Math.max(...resources.slice(i, i + interval)) });
                xaxis++;
            }
        });
        return result;
    }

    useEffect(() => {
        if (!data || !data.level1Teams) return;
        const result = buildGraph(data.level1Teams,data.milestones[0].startDay);
        let teamColors = {};
        data.level1Teams.forEach((team) => {
            teamColors[team.name] = team.swimlane[0].taskFillHex;
        });
        setTeams(data.level1Teams.map(t => t.name));
        setTeamColor(teamColors);
        setGraph([...result]);
    }, [data])

    if (loading) return "Loading...";

    return (
        <>
            {!loading && (
                <div className='container'>
                    <ResponsiveContainer >
                        <BarChart
                            data={graph}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            {/* label={{ value: "Time (months)", position: "bottom"}} */}
                            <XAxis interval={0} dataKey="period" />
                            <YAxis label={{ value: 'Head Count', angle: -90, position: 'insideLeft' }}/>
                            <Tooltip labelStyle={{ color: 'white' }} contentStyle={{ backgroundColor: 'black', borderRadius: '5%', fontSize: '10px' }} />
                            <Legend/>
                            {teams.map((label, index) => (
                                <Bar
                                    dataKey={label}
                                    stackId="x"
                                    fill={teamColor[label]}
                                    key={label} />
                            ))}

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </>
    )

}

export default ResourceComponent