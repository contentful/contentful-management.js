export interface Search {
  skip?: number,
  limit?: number,
  order?: string,
  content_type?: string,
  include?: number,
  [key: string]: any,
}
