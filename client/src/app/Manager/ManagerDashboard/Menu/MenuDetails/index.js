import React , {useEffect} from "react";
import PropTypes from "prop-Types";
import { useParams } from "react-router-dom";
import {getOwnedMenu} from "../../../../../actions/menu.actions"
import Spinner from "../../../../utils/Spinner";

const menuDetails = ({menu,getOwnedMenu})=>{
  const {menuId, restaurantId} = useParams();
  useEffect(()=>{
    getOwnedMenu(menuId,restaurantId )
  },[menu.loading,menuId, restaurantId]);
  return menu.loading? (<Spinner/>) :
  (<div>

  </div>
  )
}