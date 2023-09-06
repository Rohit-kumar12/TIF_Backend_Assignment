import express from "express";

import { requireSignIn } from "../middlewares/authmiddleware.js";
import { Create } from "../controllers/communityController/createCommunity.js";
import { GetAll } from "../controllers/communityController/getAllCommunity.js";
import { getAllCommunityMembers } from "../controllers/communityController/getAllCommunityMember.js";
import { getMyOwnedCommunities } from "../controllers/communityController/getMyOwnedCommunities.js";
import { getMyJoinedCommunities } from "../controllers/communityController/getMyJoinedCommunities.js";

const router = express.Router();

router.post("/community", requireSignIn, Create);
router.get("/community", requireSignIn, GetAll);
router.get("/community/:id/members", requireSignIn, getAllCommunityMembers);
router.get("/community/me/owner", requireSignIn, getMyOwnedCommunities);
router.get("/community/me/member", requireSignIn, getMyJoinedCommunities);

export default router;
