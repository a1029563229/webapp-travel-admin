import service from "@/service";

export const ApiGetShopList = (params: any) => {
  return service.get('/shop/list', { params });
}