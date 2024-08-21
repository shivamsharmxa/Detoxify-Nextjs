import {connect} from '../../../../lib/mongodb'
import User from '../../../../models/User'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { getDataFromToken } from 'src/helpers/getDataFromToken';


connect()

export async function POST(request:NextRequest) {
    //extract data from token
   const userId =  await getDataFromToken(request)
   const user = User.findOne({_id: userId}).select("-password")

   //check if there is no user

   return NextResponse.json({
    message:"User found",
    data: user
   })
}