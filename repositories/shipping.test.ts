// @ts-nocheck
import { getShippingAmount, API_BASE_URL, ShippingType } from './shipping';
import { SHIPPING_TOKEN } from "@config/index";
import fetchMock from 'jest-fetch-mock';
import { mockResponse } from '@test/mocks/shippingApiResponse'; 

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('getShippingAmount', () => {
  it('should fetch shipping amount with correct parameters', async () => {
    const mockZipCode = '1234';
    const mockShippingType: ShippingType = 'ship_pap';

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await getShippingAmount(mockZipCode, mockShippingType);

    expect(result).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/shipping_options?&to_zip_code=${mockZipCode}&types=${mockShippingType}`,
      {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + SHIPPING_TOKEN
        }
      }
    );
  });

  it('should throw an error if network response is not ok', async () => {
    const mockZipCode = '1234';
    const mockShippingType: ShippingType = 'ship_pap';

    fetchMock.mockResponseOnce('', { status: 500 });

    await expect(getShippingAmount(mockZipCode, mockShippingType)).rejects.toThrow('Network response was not ok');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/shipping_options?&to_zip_code=${mockZipCode}&types=${mockShippingType}`,
      {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + SHIPPING_TOKEN
        }
      }
    );
  });
});
