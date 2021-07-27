import express from "express";
import cloudinary from "../core/cloudinary";

class UploadController {
  async upload(req: express.Request, res: express.Response): Promise<void> {
    const file = req.file;

    cloudinary.v2.uploader
      .upload_stream({ resource_type: "auto" }, (err, result) => {
        if (err || !result) {
          return res.status(500).json({
            status: "error",
            message: err || "upload error",
          });
        }
        res.status(201).json(result);
      })
      .end(file?.buffer);
  }
}

export const UploadCtrl = new UploadController();
