import { PrismaClient } from "@prisma/client";
import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
export abstract class Common {
  private client: AxiosInstance;
  constructor(headers?: AxiosRequestHeaders) {
    this.client = axios.create({
      headers,
    });
  }

  public async get<T>(url: string): Promise<T> {
    const { data } = await this.client.get(url);
    return data as T;
  }
}
