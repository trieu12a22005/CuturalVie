import React, { useEffect, useRef, useState } from 'react'
import CardGame from './Game'
import CardGameHeader from '../../../components/CardGame/Header'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { getcard } from '../../../store/Card';
import Loader from '../../../components/loading';
import Character from '../../../components/CardGame/Character';
import axiosInstance from '../../../api/axios'
const cardsData = [
  { type: "text", value: "Chầu Văn", matchGroup: 1 },
  { type: "image", value: "/images/chau_van.jpg", matchGroup: 1 },
  { type: "text", value: "Hát Xoan", matchGroup: 2 },
  { type: "image", value: "/images/hat_xoan.jpg", matchGroup: 2 },
  { type: "text", value: "Ca Trù", matchGroup: 3 },
  { type: "image", value: "/images/ca_tru.jpg", matchGroup: 3 },
  { type: "text", value: "Hội Gióng", matchGroup: 4 },
  { type: "image", value: "/images/hoi_giong.jpg", matchGroup: 4 },
  { type: "text", value: "Quan họ", matchGroup: 5 },
  { type: "image", value: "/images/quan_ho.jpg", matchGroup: 5 },
  { type: "text", value: "Múa rối", matchGroup: 6 },
  { type: "image", value: "/images/mua_roi.jpg", matchGroup: 6 },
  { type: "text", value: "Nhã nhạc cung đình", matchGroup: 7 },
  { type: "image", value: "/images/nha_nhac.jpg", matchGroup: 7 },
  { type: "text", value: "Đờn ca tài tử", matchGroup: 8 },
  { type: "image", value: "/images/don_ca_tai_tu.jpg", matchGroup: 8 }
];
function Index() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { region} = useSelector((state) => state.region);
  let timer=useRef()
  useEffect(() => {
    const fetchFakeData = async () => {
      try {
        const {data}= await axiosInstance.get('/game/get-gamedata',{
          params: {
             gameType: 'treasure',
             regionId: region
          }
        })
       dispatch(getcard(data[0].cardsData));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFakeData();
  }, []);

  if (loading) return <Loader/>;
  return (
    <>
       <CardGameHeader ref={timer}/>
        <CardGame  ref={timer}/>
       <img className=' absolute w-full top-3' src="/template/group2.png" alt="" />
       <Character/>
    </>
  )
}

export default Index