import { Hono } from "hono";
import messages from "../data/messages.json";

const sweet = new Hono();

sweet.get("/api/sweet", (c) => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  const randomMessage = messages[randomIndex];
  return c.json(randomMessage);
})

sweet.get("/api/sweet/:id", (c) => {
  const id: number = Number(c.req.param("id"));
  const message = messages[id];
  return c.json(message);
})

export default sweet;