import {connect} from '../../../../lib/mongodb'
import User from '../../../../models/User'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";


connect()

export async function POST(request:NextResponse) {
}