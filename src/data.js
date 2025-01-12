// data.js
export const initialData = [
    {
      id: 'electronics',
      label: 'Electronics',
      value: 1500,
      children: [
        {
          parentId: 'electronics',
          id: 'phones',
          label: 'Phones',
          value: 800,
        },
        {
          parentId: 'electronics',
          id: 'laptops',
          label: 'Laptops',
          value: 700,
        },
      ],
    },
    {
      id: 'furniture',
      label: 'Furniture',
      value: 1000,
      children: [
        {
          id: 'tables',
          label: 'Tables',
          value: 300,
        },
        {
          id: 'chairs',
          label: 'Chairs',
          value: 700,
        },
      ],
    },
  ];
  