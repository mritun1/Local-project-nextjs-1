import getTokenData from '@/app/lib/getTokenData';
import seenModels from '@/app/models/seenModels';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { pathUrl } = body

        const getData = new getTokenData(req)

        const newsData = await seenModels.findOne({ userId: Object(getData.userID()) });
        if (!newsData) {
            console.log("update")
            // CREATE
            const dbStructure = new seenModels({
                userId: getData.userID(),
                seenNewsPost: Date.now(),
                seenEventsPost: Date.now(),
                seenOffers: Date.now(),
                seenMarket: Date.now(),
                seenSecondHand: Date.now(),
                seenBusiness: Date.now(),
                seenGroups: Date.now(),
                seenPeoples: Date.now(),
            });
            await dbStructure.save();
        } else {
            console.log("update")
            const updateObject: {
                seenNewsPost: number,
                seenEventsPost: number,
                seenOffers: number,
                seenMarket: number,
                seenSecondHand: number,
                seenBusiness: number,
                seenGroups: number,
                seenPeoples: number,
            } = {
                seenNewsPost: newsData.seenNewsPost,
                seenEventsPost: newsData.seenEventsPost,
                seenOffers: newsData.seenOffers,
                seenMarket: newsData.seenMarket,
                seenSecondHand: newsData.seenSecondHand,
                seenBusiness: newsData.seenBusiness,
                seenGroups: newsData.seenGroups,
                seenPeoples: newsData.seenPeoples,
            };

            if (pathUrl === '/app/local-news') {
                updateObject.seenNewsPost = Date.now();
            }
            if (pathUrl === '/app/local-events') {
                updateObject.seenEventsPost = Date.now();
            }
            if (pathUrl === '/app/local-offers') {
                updateObject.seenOffers = Date.now();
            }
            if (pathUrl === '/app/local-market') {
                updateObject.seenMarket = Date.now();
            }
            if (pathUrl === '/app/local-secondhand') {
                updateObject.seenSecondHand = Date.now();
            }
            if (pathUrl === '/app/local-business') {
                updateObject.seenBusiness = Date.now();
            }
            if (pathUrl === '/app/local-groups') {
                updateObject.seenGroups = Date.now();
            }
            if (pathUrl === '/app/local-people') {
                updateObject.seenPeoples = Date.now();
            }
            //UPDATE
            await seenModels.findOneAndUpdate(
                { userId: Object(getData.userID()) }, // Filter
                { $set: updateObject },
                { new: true }
            );
        }

        return NextResponse.json({
            code:1
        });
    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
};
