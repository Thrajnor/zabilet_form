import React from 'react';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Radio from './Radio'

const RadioGroup = (props) => {
  const { radios } = props

  return (
    <GridContainer spacing={0} className="form-group mt-1">
      {radios.map((prop, key) => {
        return (
          <GridItem xs={Number(prop.grid) || props.grid} sm={Number(prop.gridSM) || props.gridSM} key={key}>
            <Radio icon={prop.icon || ''} values={props.values} size={prop.size || props.size} onBlur={props.onBlur} onChange={prop.onchange || props.onChange} label={prop.label} value={prop.value} name={props.name}></Radio>
          </GridItem>
        )
      })}
    </GridContainer>
  );
}

export default RadioGroup;