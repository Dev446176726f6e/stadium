import { Injectable } from "@nestjs/common";
import { rejects } from "assert";
import axios from "axios";
const FormData = require("form-data"); // Corrected the typo here
import fs from "fs";

@Injectable()
export class SmsService {
  async sendSMS(phone_number: string, otp: string) {
    const data = new FormData();
    data.append("mobile_phone", phone_number);
    data.append("message", `Это тест от Eskiz`);
    data.append("from", "4546");

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.SMS_SERVICE_URL,
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
        ...data.getHeaders(),
      },
      data: data,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error("Error while sending SMS: ", error.message);
      return { status: 500, error: error.message };
    }
  }

  async refreshToken() {
    const https = require("follow-redirects").https;

    async function refreshToken() {
      return new Promise((resolve, reject) => {
        const options = {
          method: "PATCH",
          hostname: "notify.eskiz.uz",
          path: "/api/auth/refresh",
          headers: {
            Authorization: `Bearer ${process.env.SMS_TOKEN}`,
          },
          maxRedirects: 20,
        };

        const req = https.request(options, (res) => {
          const chunks = [];

          res.on("data", (chunk) => {
            chunks.push(chunk);
          });

          res.on("end", () => {
            const body = Buffer.concat(chunks);
            try {
              // Assuming the response is in JSON format
              const response = JSON.parse(body.toString());
              resolve(response); // Resolve with the parsed response
            } catch (error) {
              reject(
                new Error("Error parsing response JSON: " + error.message),
              );
            }
          });

          res.on("error", (error) => {
            reject(new Error("Response error: " + error.message));
          });
        });

        req.on("error", (error) => {
          reject(new Error("Request error: " + error.message));
        });

        req.end();
      });
    }

    // Usage example
    refreshToken()
      .then((response) => {
        console.log("Token refreshed successfully:", response);
      })
      .catch((error) => {
        console.error("Failed to refresh token:", error);
      });
  }

  async getToken() {
    const https = require("follow-redirects").https;

    return new Promise((resolve, reject) => {
      const options = {
        method: "POST",
        hostname: "notify.eskiz.uz",
        path: "/api/auth/login",
        headers: {},
        maxRedirects: 20,
      };

      const req = https.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          const body = Buffer.concat(chunks);
          try {
            const obj = JSON.parse(body.toString());
            const response = {
              message: obj["message"],
              token: obj["data"]["token"],
              token_type: obj["token_type"],
            };
            resolve(response); // Resolve the promise with the response
          } catch (error) {
            reject(new Error("Error parsing response JSON: " + error.message));
          }
        });

        res.on("error", function (error) {
          reject(new Error("Response error: " + error.message));
        });
      });

      const postData = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name="email"\r\n\r\n${process.env.SMS_EMAIL}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name="password"\r\n\r\n${process.env.SMS_SECRET_KEY}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--`;

      req.setHeader(
        "content-type",
        "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      );

      req.write(postData);
      req.end();

      req.on("error", function (error) {
        reject(new Error("Request error: " + error.message));
      });
    });
  }
}
