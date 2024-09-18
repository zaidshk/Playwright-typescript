import axios, { AxiosError } from "axios";
import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';
import config, { backendUrl } from "../resources/config";

export default class APIs {
  private static generateTestDataFile = `${__dirname}/../resources/lastGenerateTestData.json`
  private static generateTestDataResponse: GetGenerateTestDataResponse['data'] | null = null

  private static createUserFile = `${__dirname}/../resources/lastCreateUser.json`
  private static createUserResponse: GetCreateUserResponse['data'] | null = null

  public static async generateTestData() {
    // use current data
    if (this.generateTestDataResponse) {
      return this.generateTestDataResponse
    }

    // load data from file
    try {
      if (config.data.useGenerateTestDataFromFile && fs.existsSync(this.generateTestDataFile)) {
        const testDataRaw = await readFile(this.generateTestDataFile, { encoding: 'utf8' })
        this.generateTestDataResponse = (JSON.parse(testDataRaw) as GetGenerateTestDataResponse['data'])
        console.info('Loaded cached user data', this.generateTestDataResponse)
        return this.generateTestDataResponse
      }
    } catch (error) {
      console.error("Error getting last generate test data file. Getting from API instead");
    }

    try {
      const response = await axios.get<GetGenerateTestDataResponse>(
        `${backendUrl}/api/admin/automation/generate-test-data?secret=Aj@rAutomat`,
        {
          headers: {
            'X-Automation-Key': 'YXV0b21hdGlvbktleUAxMjMh',
          },
        },
      );

      console.log('generate-test-data response:', response.data.data);
      this.generateTestDataResponse = response.data.data

      // save last data
      await writeFile(this.generateTestDataFile, JSON.stringify(this.generateTestDataResponse, null, 2), { encoding: 'utf8', flag: 'w' })

      return this.generateTestDataResponse;
    } catch (error: any | AxiosError) {
      console.error('ERROR calling generate-test-data api:', error.message);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response data:', error.response.data)
      }
      throw new Error("ERROR calling generate-test-data api");
    }
  }

  public static async createUser() {
    // use current data
    if (this.createUserResponse) {
      return this.createUserResponse
    }

    // load data from file
    try {
      if (config.data.useCreateUserFromFile && fs.existsSync(this.createUserFile)) {
        const testDataRaw = await readFile(this.createUserFile, { encoding: 'utf8' })
        this.createUserResponse = (JSON.parse(testDataRaw) as GetCreateUserResponse['data'])
        console.info('Loaded cached user data', this.createUserResponse)
        return this.createUserResponse
      }
    } catch (error) {
      console.error("Error getting last generate test data file. Getting from API instead");
    }

    try {
      const response = await axios.get<GetCreateUserResponse>(
        `${backendUrl}/api/admin/automation/createUser?secret=Aj@rAutomat`,
        {
          headers: {
            'X-Automation-Key': 'YXV0b21hdGlvbktleUAxMjMh',
          },
        },
      );

      console.log('createUser response:', response.data.data);
      this.createUserResponse = response.data.data

      // save last data
      await writeFile(this.createUserFile, JSON.stringify(this.createUserResponse, null, 2), { encoding: 'utf8', flag: 'w' })

      return this.createUserResponse;
    } catch (error: any | AxiosError) {
      console.error('ERROR calling createUser api:', error.message);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response data:', error.response.data)
      }
      throw new Error("ERROR calling createUser api");
    }
  }
}

export interface GetCreateUserResponse {
  data: {
    testUser: {
      "country": string,
      "language": string,
      "firstName": string,
      "lastName": string,
      "role": string,
      "phoneNumber": string,
      "email": string,
      "paymentLink": string,
      "password": string,
      "id": string,
    }
  }
}

export interface GetGenerateTestDataResponse {
  data: {
    testData: {
      landLordUser: {
        country: string,
        language: string,
        firstName: string,
        lastName: string,
        role: string,
        phoneNumber: string,
        email: string,
        paymentLink: string,
        password: string,
        id: string
      },
      tenantUser: {
        country: string,
        language: string,
        firstName: string,
        lastName: string,
        role: string,
        phoneNumber: string,
        email: string,
        paymentLink: string,
        password: string,
        id: string
      },
      account: {
        id: string,
        logo: string,
        name: string,
        isRegisteredCompany: boolean,
        isOnBehalf: boolean,
        users: [
          string
        ],
        user: string,
        createdAt: string,
        updatedAt: string,
        createdAtMillis: string,
        updatedAtMillis: string,
        kycStatus: string
      },
      tenantContact: {
        id: string,
        name: string,
        userId: string,
        roles: [
          string
        ],
        company: string,
        contactDetails: {
          phone: string,
          email: string
        },
        firstName: string,
        lastName: string,
        l10nDetails: {
          country: string,
          language: string
        },
        createdAt: string,
        updatedAt: string
      },
      propertyUnit: {
        id: string,
        name: string,
        address: {
          city: string,
          code: string,
          country: string,
          geo: {
            box: {
              alpha: [
                string,
                string
              ],
              omega: [
                string,
                string
              ]
            },
            code: string,
            coordinates: [
              string,
              string
            ]
          },
          region: string,
          street: {
            name: string,
            number: string
          }
        },
        units: [
          {
            id: string,
            name: string
          }
        ]
      }
    }
  }
}
