import { $http } from '@/utils/request';

export function login(data: {}) {
  return $http.post('/user/login', data);
}

export function register(data: {}) {
  return $http.post('/user/register', data);
}

export function getCommodity(data: {}) {
  return $http.get('/goods/search', data);
}

export function getGoodsDetail(data: { goodsId: string }) {
  return $http.get('/goods/selectById', data);
}

export function addMailOrder(data: {}) {
  return $http.post('/orders/addPost', data);
}

export function getUserName(data: {}) {
  return $http.get('/user/getUser', data);
}

export function getUserAllOrder(data: {}) {
  return $http.get('/orders/findAllUserOrders', data);
}

export function getOrderDetail(data: {}) {
  return $http.get('/orders/findUserOrder', data);
}

export function updateOrderDetail(data: {}) {
  return $http.post('/orders/update', data);
}

export function getAllUserAllOrder(data: {}) {
  return $http.get('/orders/findAll', data);
}

export function addVisitOrder(data: {}) {
  return $http.post('/orders/addDoor', data);
}
