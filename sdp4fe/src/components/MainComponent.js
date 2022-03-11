import TabComponent from "./TabComponent";
import HeaderComponent from "./HeaderComponent";
import { OptionProvider } from "../providers/OptionProvider";

const MainComponent = () => {
  return (
    <div>
      <OptionProvider >
        <HeaderComponent />
        <TabComponent />
      </OptionProvider>
    </div>
  );
}

export default MainComponent;