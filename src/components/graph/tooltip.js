export const NodeTooltip = ({ color, name }) => `
  <div
    style="
      position: relative;
      max-width: 400px;
      border: 4px solid ${ color };
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
    ">
    <div style="position: absolute; left: 0; top: 0; height: 100%; width: 100%; background-color: ${ color }; filter: opacity(0.25);">&nbsp;</div>
    <h5 style="margin: 0; padding: 0.25rem;">${ name }</h5>
  <div>
`
