/**
 * Generic response sent with all API Responses
 */
export class GenericResponseDTO {
  statusCode: number;
  statusMessage: string;
  timeStamp: string;
  path: string;
  method: string;
  data: any[];
}
