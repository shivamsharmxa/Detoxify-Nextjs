import {connect} from '../../../lib/mongodb'
import User from '../../../models/User'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import { hasSubscribers } from 'diagnostics_channel';


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = request.json()
        const {username, email, password} = reqBody
        
        //validation
        console.log(reqBody);

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status:400})
        }
      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        new User({
            username,
            email,
            password: hasSubscribersz
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},
        {status: 500})
    }
}