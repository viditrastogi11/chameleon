import { useEffect, useState } from "react";
import Center from "../components/Center";
import DynamicContainer from "../components/DynamicContainer";
import { hexToRgb, RGBToHSL } from "../Utils/common_function";
import Select from "react-select";
import { options } from "../Utils/room_types";

const Chameleon = () => {
  const [bgColor, setBGColor] = useState("#e55754");
  const [textColor, setTextColor] = useState("hsl(0,0%,100%)");
  const [showSelect, setShowSelect] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    label: "Default",
    value: "Default",
  });

  const customStyles = {
    menu: (base) => ({
      ...base,
      width: "max-content",
      minWidth: "200px",
    }),
    container: (base) => ({
      ...base,
      width: "max-content",
      minWidth: "200px",
    }),
  };
  const threshold = 55;

  const handleSelectChange = (e) => {
    setSelectedValue(e);
    setShowSelect(false);
  };

  useEffect(() => {
    // red, green, blue
    const { r, g, b } = hexToRgb(bgColor);
    //Hue, Saturation, Lightness
    const { h, s, l } = RGBToHSL(r, g, b);
    const blackOrwhite = l > threshold ? 0 : 100;
    setTextColor(`hsl(0, 0%, ${blackOrwhite}%)`);
  }, [bgColor]);

  const handleBgChange = (e) => {
    setBGColor(e.target.value);
  };

  return (
    <Center>
      <DynamicContainer bgColor={bgColor}>
        <div
          style={{ color: textColor, cursor: "pointer" }}
          onClick={() => {
            setShowSelect(true);
          }}
          hidden={showSelect}
        >
          {selectedValue.label}
        </div>
        {showSelect && (
          <Select
            styles={customStyles}
            autoFocus
            options={options}
            onBlur={() => {
              setShowSelect(false);
            }}
            value={selectedValue}
            onChange={handleSelectChange}
          ></Select>
        )}
      </DynamicContainer>
      <p style={{ color: "white" }}>Choose Background Color</p>
      <input type="color" value={bgColor} onChange={handleBgChange} />
    </Center>
  );
};
export default Chameleon;
