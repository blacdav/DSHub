import { RequestHandler } from "express";
import models from "../../models";
import { sequelized } from "../../db";

const { Feed } = models;

export const AddFeed: RequestHandler = async (req, res) => {
    const { name, batch_number, feed_type, larvea_count, status } = req.body;
    const { user_id } = req.user!;

    if (!name || !batch_number) {
        return res.status(404).json({
            success: true,
            message: "All Input is required"
        })
    }

    try {
        const r = await sequelized.transaction(async t => {
            const feed = await Feed.create({
                name,
                farmer_id: user_id,
                batch_number,
                feed_type,
                larvea_count,
                status
            }, { transaction: t })
        });

        return res.status(200).json({
            success: true,
            message: ""
        })
    } catch (err) {
        return `Server Error: ${err}`
    }
}