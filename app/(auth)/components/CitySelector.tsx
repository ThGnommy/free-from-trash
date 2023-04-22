import { StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Select, Text } from "react-native-magnus";

const CitySelector = ({
  selectValue,
  setSelectedValue,
}: {
  selectValue: string;
  setSelectedValue: (state: string) => void;
}) => {
  const [cities, setCities] = useState<string[]>([]);
  const selectRef = React.useRef<any>();

  const URL_CITIES =
    "https://axqvoqvbfjpaamphztgd.functions.supabase.co/province?onlyname=true";

  const fetchCities = async () => {
    try {
      const response = await fetch(URL_CITIES, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCities(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const openSelection = async () => {
    if (cities.length === 0) await fetchCities();
    selectRef.current?.open();
  };

  return (
    <>
      <Button
        bg={selectValue ? "green600" : "blue600"}
        w={"100%"}
        onPress={openSelection}
      >
        {selectValue ? selectValue.toString() : "Select your province"}
      </Button>

      <Select
        onSelect={(value) => {
          console.log(value);
          setSelectedValue(value);
        }}
        ref={selectRef}
        value={selectValue}
        title="Select your province"
        message="You can change it after"
        mt="md"
        pb="2xl"
        roundedTop="xl"
        data={cities}
        renderItem={(item) => (
          <Select.Option value={item} py="md" px="xl">
            <Text>{item}</Text>
          </Select.Option>
        )}
      />
    </>
  );
};

export default CitySelector;

const styles = StyleSheet.create({});
