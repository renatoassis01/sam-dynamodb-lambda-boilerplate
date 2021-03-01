import { DocumentClient as fakeItems } from 'aws-sdk/clients/dynamodb';
import { ItemInterface } from '../../interfaces/iteminterface';

const data = [
  {
    id: 'A/k3dE57B2oVQbrM',
    name: 'item01',
    user_id: '60dc9b14-8cd3-455f-a014-678d2bdf00db',
    enabled: true,
    created_at: '2021-02-20T15:07:03.742Z',
    updated_at: '2021-02-25T15:07:03.742Z',
  },
  {
    id: '0EgwhJpy6O6HACiB',
    name: 'item02',
    user_id: '60dc9b14-8cd3-455f-a014-678d2bdf00db',
    enabled: true,
    created_at: '2021-02-20T15:07:03.742Z',
    updated_at: '2021-02-25T15:07:03.742Z',
  },
  {
    id: 'Lv97Dzx6jcfRr82t',
    name: 'item03',
    user_id: '60dc9b14-8cd3-455f-a014-678d2bdf00db',
    enabled: true,
    created_at: '2021-02-20T15:07:03.742Z',
    updated_at: '2021-02-25T15:07:03.742Z',
  },
  {
    id: 'T77txjMGw+WdRdMK',
    name: 'item04',
    user_id: '60dc9b14-8cd3-455f-a014-678d2bdf00db',
    enabled: true,
    created_at: '2021-02-20T15:07:03.742Z',
    updated_at: '2021-02-25T15:07:03.742Z',
  },
  {
    id: 'WQFVNbvZhXC9Dt7H',
    name: 'item05',
    user_id: '60dc9b14-8cd3-455f-a014-678d2bdf00db',
    enabled: true,
    created_at: '2021-02-20T15:07:03.742Z',
    updated_at: '2021-02-25T15:07:03.742Z',
  },
  {
    id: 'TfIj/TAos6UsA1g/',
    name: 'item06',
    user_id: '60dc9b14-8cd3-455f-a014-678d2bdf00db',
    enabled: true,
    created_at: '2021-02-20T15:07:03.742Z',
    updated_at: '2021-02-25T15:07:03.742Z',
  },
];

export const scanOutput: fakeItems.ScanOutput = {
  Items: data,
  Count: data.length,
  ScannedCount: data.length,
};

export const items: ItemInterface[] = data;
