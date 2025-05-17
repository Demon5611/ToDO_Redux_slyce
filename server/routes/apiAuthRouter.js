import express from "express";
import axios from "axios";
import { User } from "../../../db/models";
import messageByStatus from "../utils/messageByStatus";

apiAuthRouter.post("/sms", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(500).json({ message: "No phone provided" });
    const response = await axios.post(
      "https://direct.i-dgtl.ru/api/v1/verifier/send",
      {
        channelType: "SMS",
        destination: phone,
        gatewayId: process.env.API_KEY_GATEWAY_ID,
      },
      {
        headers: {
          Authorization: `Basic ${process.env.API_KEY_AUTH}`,
          "Content-Type": "application/json",
        },
      }
    );
    setTimeout(() => {
      const response = { data: { uuid: "uuid", phone } };
      res.json(response.data);
    }, 2000);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});

apiAuthRouter.post("/code", async (req, res) => {
  try {
    const { uuid, code, phone } = req.body;
    const response = await axios.post(
      "https://direct.i-dgtl.ru/api/v1/verifier/check",
      {
        uuid,
        code,
      },
      {
        headers: {
          Authorization: `Basic ${process.env.API_KEY_AUTH}`,
          "Content-Type": "application/json",
        },
      }
    );
    setTimeout(async () => {
      const response = { data: { status: "CONFIRMED" } }; // 'CONFIRMED' | 'WRONG_CODE' | 'EXPIRED' | 'NOT_FOUND'
      if (response.data.status === "CONFIRMED") {
        const [user, created] = await User.findOrCreate({
          where: { phone },
        });
        req.session.user = {
          id: user.id,
          phone: user.phone,
          name: user.name,
          email: user.email,
        };
        return res.status(200).json({ user, created });
      }
      return res
        .status(400)
        .json({ message: messageByStatus(response.data.status) });
    }, 2000);
  } catch (error) {
    console.log('Posuble server not lounch',error);
    return res.status(500).json(error);
  }
});
