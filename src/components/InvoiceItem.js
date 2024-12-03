// InvoiceItem.js

import React, { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { Table, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import EditableField from './EditableField';

const productImages = [
  { name: 'Product 1', image: 'https://via.placeholder.com/50?text=P1' },
  { name: 'Product 2', image: 'https://via.placeholder.com/50?text=P2' },
  { name: 'Product 3', image: 'https://via.placeholder.com/50?text=P3' },
  { name: 'Product 4', image: 'https://via.placeholder.com/50?text=P4' },
  { name: 'Product 5', image: 'https://via.placeholder.com/50?text=P5' },
  { name: 'Product 6', image: 'https://via.placeholder.com/50?text=P6' },
  { name: 'Product 7', image: 'https://via.placeholder.com/50?text=P7' },
  { name: 'Product 8', image: 'https://via.placeholder.com/50?text=P8' },
  { name: 'Product 9', image: 'https://via.placeholder.com/50?text=P9' },
  { name: 'Product 10', image: 'https://via.placeholder.com/50?text=P10' },
];

const InvoiceItem = ({ onItemizedItemEdit, onRowAdd, onRowDel, currency, items }) => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>PICTURE</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onItemizedItemEdit={onItemizedItemEdit}
              onDelEvent={() => onRowDel(item)}
              currency={currency}
            />
          ))}
        </tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAdd}>Add Item</Button>
    </div>
  );
};

const ItemRow = ({ item, onItemizedItemEdit, onDelEvent, currency }) => {
  const [selectedImage, setSelectedImage] = useState(item.image || '');

  const handleImageSelect = (image) => {
    setSelectedImage(image.image);
    onItemizedItemEdit({
      target: {
        name: 'name',
        id: item.id,
        value: image.name,
      },
      preventDefault: () => {}, // Adding preventDefault as a no-op function
    });
  };

  return (
    <tr>
      <td style={{ width: '30%' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: 'text',
            name: 'name',
            placeholder: 'Item name',
            value: item.name,
            id: item.id,
          }}
        />
      </td>
      <td style={{ width: '20%' }}>
        <div className="d-flex align-items-center">
          {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: '50px', height: '50px', marginRight: '10px' }} />}
          <DropdownButton title="Select Picture" variant="secondary" size="sm">
            {productImages.map((image, index) => (
              <Dropdown.Item key={index} onClick={() => handleImageSelect(image)}>
                <img src={image.image} alt={image.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                {image.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      </td>
      <td style={{ minWidth: '70px' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: 'number',
            name: 'quantity',
            min: 1,
            step: '1',
            value: item.quantity,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: '130px' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: 'number',
            name: 'price',
            min: 1,
            step: '0.01',
            textAlign: 'text-end',
            value: item.price,
            id: item.id,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: '50px' }}>
        <BiTrash
          onClick={onDelEvent}
          style={{ height: '33px', width: '33px', padding: '7.5px' }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
