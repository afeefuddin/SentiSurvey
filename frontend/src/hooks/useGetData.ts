"use client";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const promiseWrapper = (promise: Promise<AxiosResponse<any, any>>) => {
  let status = "pending";
  let result: unknown;

  const s = promise.then(
    (value) => {
      status = "success";
      result = value;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return () => {
    switch (status) {
      case "pending":
        throw s;
      case "success":
        return result;
      case "error":
        throw result;
      default:
        throw new Error("Unknown status");
    }
  };
};

function useGetData(url: string) {
  const [resource, setResource] = useState<unknown>(null);

  useEffect(() => {
    const getData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const promise = axios
        .get(apiUrl + url, { withCredentials: true })
        .then((response) => response.data.data);
      setResource(promiseWrapper(promise));
    };

    getData();
  }, [url]);

  return resource;
}

export default useGetData;
