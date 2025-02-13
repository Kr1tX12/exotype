'use client';

import { useStore } from "@/store/store";
import React, { useEffect } from "react";

const Results = () => {
  const updateTypedText = useStore(state => state.updateTypedText);
  const updateNeedText = useStore(state => state.updateNeedText);

  useEffect(() => {
    updateNeedText('');
    updateTypedText('');
  })
  return <div>Results</div>;
};

export default Results;
