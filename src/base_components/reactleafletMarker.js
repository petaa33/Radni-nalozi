import L from 'leaflet';

const factoryIcon = new L.Icon({
    iconUrl: null,
    iconRetinaUrl: "https://www.svgrepo.com/show/171923/factory.svg",
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(20, 25),
    className: 'leaflet-div-icon'
});

const warehouseIcon = new L.Icon({
    iconUrl: null,
    iconRetinaUrl: "https://img.uxwing.com/wp-content/themes/uxwing/download/logistics-shipping-delivery/warehouse-icon.png",
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(20, 20),
    className: 'leaflet-div-icon'
})

export { factoryIcon, warehouseIcon };