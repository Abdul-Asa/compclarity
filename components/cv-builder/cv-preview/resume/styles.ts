import { StyleSheet } from "@react-pdf/renderer";
import { mapFontWeight } from "./utils";

export const styles = StyleSheet.create({
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  link: {
    textDecoration: 'underline',
    display: 'flex',
  },
  bold: {
    fontWeight: mapFontWeight('bold'),
  },
  justifyBetween: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
});

