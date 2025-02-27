import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";
import { List } from "react-native-paper";
import QRcode from "../../Components/QRCode";

const dismissKeyboard = () => {
  Keyboard.dismiss();
};

export const GenericTab = ({ route }) => {
  const [expanded, setExpanded] = useState(null);
  const [data, setData] = useState({});
  const [scan, setscan] = useState({scan: true});

  useEffect(()=>{
    console.log("Data changed: ",data);
  },[data]);

  const handlePress = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  if (!scan.scan) return <QRcode setscan={setscan} scan={scan} data={data} setData={setData} />;
  else
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView>
          {route?.params?.components?.map((component, index) => {
            const text = route?.params?.text?.[index];

            return typeof text === "string" && text ? (
              <List.Accordion
                title={text}
                expanded={expanded === index}
                onPress={() => handlePress(index)}
                key={index}
              >
                {React.cloneElement(component, {
                  key: index,
                  data,
                  setData,
                  setscan,
                })}
              </List.Accordion>
            ) : (
              React.cloneElement(component, {
                key: index,
                data,
                setData,
              })
            );
          })}
        </ScrollView>
      </TouchableWithoutFeedback>
    );
};

export default GenericTab;
