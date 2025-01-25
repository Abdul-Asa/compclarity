"use client";

import { Text, View } from "@react-pdf/renderer";
import { parse } from "node-html-parser";
import { CVSettings } from "../../types";
import { styles } from "./styles";

export const parseAndRenderHTML = (html: string, fontSize: number, settings: CVSettings) => {
  if (!html) return null;

  const root = parse(html);
  const elements: JSX.Element[] = [];

  root.childNodes.forEach((node, index) => {
    if (node.nodeType === 3) {
      // Text node
      elements.push(
        <Text
          key={index}
          style={{
            ...styles.text,
            fontSize,
            fontFamily: settings.body.font.family,
            fontWeight: settings.body.font.weight,
            color: settings.body.color,
          }}
        >
          {node.text.trim()}
        </Text>
      );
    } else if (node.nodeType === 1) {
      // Element node
      const element = node as any;

      if (element.tagName === "UL") {
        element.childNodes.forEach((li: any, liIndex: number) => {
          if (li.tagName === "LI") {
            elements.push(
              <View key={`li-${index}-${liIndex}`} style={{ ...styles.row, ...styles.gap2 }}>
                <Text
                  style={{
                    ...styles.text,
                    fontSize,
                    fontFamily: settings.body.font.family,
                    fontWeight: settings.body.font.weight,
                    color: settings.body.color,
                  }}
                >
                  {settings.bulletPoints}
                </Text>
                <Text
                  style={{
                    ...styles.text,
                    flex: 1,
                    fontSize,
                    fontFamily: settings.body.font.family,
                    fontWeight: settings.body.font.weight,
                    color: settings.body.color,
                  }}
                >
                  {li.text.trim()}
                </Text>
              </View>
            );
          }
        });
      } else if (element.tagName === "P") {
        elements.push(
          <Text
            key={`p-${index}`}
            style={{
              ...styles.text,
              fontSize,
              fontFamily: settings.body.font.family,
              fontWeight: settings.body.font.weight,
              color: settings.body.color,
            }}
          >
            {element.text.trim()}
          </Text>
        );
      }
    }
  });

  return elements;
};

export const formatDate = (date: string, format: string = "numbers-slash") => {
  if (!date) return "";

  const [year, month] = date.split("-");

  switch (format) {
    case "numbers-slash":
      return `${month}/${year}`;
    case "numbers-dash":
      return `${month}-${year}`;
    case "words-short":
      return `${getMonthName(month, true)} ${year}`;
    case "words-long":
      return `${getMonthName(month, false)} ${year}`;
    default:
      return `${month}/${year}`;
  }
};

const getMonthName = (month: string, short: boolean = false) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = parseInt(month) - 1;
  const monthName = months[monthIndex];

  return short ? monthName.slice(0, 3) : monthName;
};
