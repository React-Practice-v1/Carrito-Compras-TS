export type GuitarT = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type CartItem = GuitarT & {
  quantity: number;
};

// ***************  PARA JALAR UNO EN ESPECIFICO ***************
// export type GuitarID = GuitarT["id"];

// ***************  PARA JALAR VARIOS ***************
// export type CartItem = Pick<GuitarT, "id" | "name" | " price"> & {
//   quantity: number;
// };
