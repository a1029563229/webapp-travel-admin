import service from "@/service";

export const ApiGetGuidelineList = (params: any) => {
  return service.get("/guideline/list", { params });
}

export const ApiDeleteGuideline = (id: number) => {
  return service.post("/guideline/delete", { id });
}