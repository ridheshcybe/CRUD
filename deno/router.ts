import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Router } from "https://deno.land/x/oak/mod.ts";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

let products: Product[] = [
  {
    id: "1",
    name: "Product One",
    description: "This is Product One",
    price: 50,
  },
  {
    id: "2",
    name: "Product Two",
    description: "This is Product Two",
    price: 100,
  },
  {
    id: "3",
    name: "Product Three",
    description: "This is Product Three",
    price: 150,
  },
];

const router = new Router();

router
  .get("/", ({ response }: { response: any }) => {
    response.body = {
      success: true,
      data: products,
    };
  })
  .get(
    "/:id",
    ({ params, response }: { params: { id: string }; response: any }) => {
      const product: Product | undefined = products.find(
        (p) => p.id === params.id
      );

      if (product) {
        response.status = 200;
        response.body = {
          success: true,
          data: product,
        };
      } else {
        response.status = 404;
        response.body = {
          success: false,
          msg: "No Product Found",
        };
      }
    }
  )
  .post("/", async ({ request, response }: { request: any; response: any }) => {
    const body = await request.body();

    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No Data",
      };
    } else {
      const product: Product = body.value;
      product.id = v4.generate();
      products.push(product);
      response.status = 201;
      response.body = {
        success: true,
        data: product,
      };
    }
  })
  .put(
    "/:id",
    async ({
      params,
      request,
      response,
    }: {
      params: { id: string };
      request: any;
      response: any;
    }) => {
      const product: Product | undefined = products.find(
        (p) => p.id === params.id
      );

      if (product) {
        const body = await request.body();

        const updateData: {
          name?: string;
          description?: string;
          price?: number;
        } = body.value;

        products = products.map((p) =>
          p.id === params.id ? { ...p, ...updateData } : p
        );

        response.status = 200;
        response.body = {
          success: true,
          data: products,
        };
      } else {
        response.status = 404;
        response.body = {
          success: false,
          msg: "No Product Found",
        };
      }
    }
  )
  .delete(
    "/:id",
    ({ params, response }: { params: { id: string }; response: any }) => {
      products = products.filter((p) => p.id !== params.id);
      response.body = {
        success: true,
        msg: "Product Removed",
      };
    }
  );

export default router;
