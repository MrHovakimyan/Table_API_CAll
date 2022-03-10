export const countryMarkUp = (item, i) => {
  return `
    <tr class="draggable" draggable="true" data-index="${i}">
    <td>${item.countryCode}</td>
    <td>${item.countryName}</td>
    <td>${item.population}</td>
    <td>${`Deaths: ${item.deaths}, Confirmed: ${item.confirmed}, Recovered: ${item.recovered}`}</td>
    <td>${item.updatedAt}</td>
    </tr>
    `;
};
