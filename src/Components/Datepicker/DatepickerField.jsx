import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from "@material-ui/pickers";
import { useStyles } from "../Datepicker/DatepickerField.style";





function DatepickerField(props) {
  const classes = useStyles();
  const onHandleDatePickerChange = (name, value) => ({
        // console.log("name value", name, value);
    target:{
        name,
        value
    }
  })
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
          format="yyyy/MM/dd"
          margin="normal"
          name={props.name}
          id="date-picker-dialog"
          className={props.className}
          label={props.label}
          value={props.value}
        //   onChange={props.onchange}
          onChange={(date) => props.onchange(onHandleDatePickerChange(props.name, date))}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          />   
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default DatepickerField;
