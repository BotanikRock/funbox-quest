import React from 'react';
import Point from '../containers/PointItem';

const PointList = (props) => {
  return (
    <div className="point-list">
      {props.points.map(({name, address}, index) =>
        <Point
          key={`${name}-${index}`}
          name={name} index={index} address={address}
          parentClassName="point-list__item"/>
      )}
    </div>
  );
};

PointList.displayName = 'PointList';

export default PointList;
