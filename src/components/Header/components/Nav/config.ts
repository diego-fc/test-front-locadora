export const menuList = [
  {
    label: "Dashboard",
    items: [
      {
        label: "Home",
        route: "/",
      },
    ],
  },
  {
    label: "Maintenance",
    items: [
      {
        label: "System",
        items: [
          {
            label: "Airport",
            route: "/airports",
            show: false,
            claims: "Airport"
          },
          {
            label: "Country",
            route: "/countries",
            show: false,
            claims: "Country"
          },
          {
            label: "Center",
            route: "/centers",
            show: false,
            claims: "Center"
          },
          {
            label: "Currency",
            route: "/currencies",
            show: false,
            claims: "Currency"
          },
          {
            label: "Incoterm",
            route: "/incoterms",
            show: false,
            claims: "Incoterms"
          },
          {
            label: "Interface - Freigth Forwarder",
            route: "/freigthForwarder",
            show: false,
            claims: "Freight Forwarder"
          },
          {
            label: "Consolidation Center",
            route: "/consolidationCenter",
            show: false,
            claims: "Consolidation Center"
          },
          {
            label: "Incoterm Complement",
            route: "/incotermsComplements",
            show: false,
            claims: "Incoterms Complement"
          },
          {
            label: "Service Level",
            route: "/serviceLevels",
            show: false,
            claims: "Service Level"
          },
          {
            label: "Custom Regime",
            route: "/customRegimes",
            show: false,
            claims: "Customs Regime"
          },
          {
            label: "Pickup Zone",
            route: "/pickupZones",
            show: false,
            claims: "Pickup Zone"
          },
          {
            label: "Material Type",
            route: "/materialTypes",
            show: false,
            claims: "Material Type"
          },
        ],
      },
    ],
  },
];
