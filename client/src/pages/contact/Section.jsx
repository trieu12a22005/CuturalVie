import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ImageCard from './ImageCard';
import ImageSlider from './Slider';

const Section = ({ title, items }) => {

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <ImageSlider items={items} />
    </section>
  );
};

export default Section;