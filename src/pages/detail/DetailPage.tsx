import React from "react";
import { useParams } from 'react-router-dom'

type MatchParams = {
  touristRouteId: string,
  other: string
}

// interface MatchParams2 {
//   touristRouteId: string,
//   other: string
// }


export const DetailPage: React.FC = () => {
  var params = useParams<MatchParams>();
  return <h1>旅游路线详情页, 路线id: {params.touristRouteId} {params.other} </h1>;
};
