import _uniq from 'lodash.uniqby';
import React, { useEffect, useState } from 'react';
import { Box, Heading, Image, Text } from 'rebass';

import api from '../../api';
import { BorderBox } from '../../primitives';
import { T_Marketing_Product, T_Occurrence, T_SKU } from '../../types';

const Occurrences = () => {
  const [data, setData] = useState([] as T_Occurrence[]);
  const [SKU, setSKU] = useState([] as T_SKU[]);
  const [products, setProducts] = useState([] as T_Marketing_Product[]);

  useEffect(() => {
    let current = true;
    const load = async () => {
      api.user.occurrences.get().then(data => {
        current && setData(_uniq(data, 'serialNumber'));
      });
      api.cart.admin.translator().then(data => {
        current && setSKU(data);
      });
      api.cart.admin.marketingProducts().then(data => {
        current && setProducts(data);
      });
    };
    load();

    return () => {
      current = false;
    };
  }, []);

  if (!data) return null;

  return (
    <BorderBox>
      <Heading as="h2">my Occurrences</Heading>
      {data.map(occ => (
        <Box
          key={occ.itemNumber}
          sx={{
            display: 'inline-block',
            color: 'white',
            bg: 'primary',
            m: 2,
            p: 2,
            borderRadius: 5,
          }}
        >
          <Text>
            {occ.nickName} / {occ.occurrenceType} / {occ.portType}
          </Text>
          <Text>Entitlements:</Text>
          {occ.entitlements.map(ent => {
            const sku = SKU.find(sku => sku.inboundIcomsCodes[0] === ent.code);
            const product = sku && products.find(p => p.sku === sku.sku);
            return (
              <Box
                key={ent.code}
                sx={{
                  display: 'inline-block',
                  bg: 'palevioletred',
                  m: 1,
                  p: 1,
                  borderRadius: 5,
                }}
              >
                {ent.name}
                <Box bg="white">
                  {product && (
                    <Image
                      sx={{ height: 40 }}
                      src={`https://sky.co.nz/${product.imageUrl}`}
                    />
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      ))}
    </BorderBox>
  );
};

export default Occurrences;
