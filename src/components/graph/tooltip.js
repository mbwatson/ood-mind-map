export const NodeTooltip = ({ color, name }) => `
  <style>
    .graph-tooltip {
      background-color: ${ color } !important;
    }
  </style>
  <div
    style="
      position: relative;
      max-width: 400px;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
    ">
    <div style="position: absolute; left: 0; top: 0; height: 100%; width: 100%; background-color: ${ color }; filter: opacity(0.25);">&nbsp;</div>
    <h6 style="margin: 0; padding: 0.25rem;">${ name }</h6>
  <div>
`
