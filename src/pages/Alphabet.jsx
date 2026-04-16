import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SectionHeader from '../components/shared/SectionHeader';
import LetterCard from '../components/alphabet/LetterCard';
import { vowels, consonants } from '../lib/kannadaData';

export default function Alphabet() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Kannada Alphabet"
          kannadaTitle="ಕನ್ನಡ ಅಕ್ಷರಗಳು"
          subtitle="Explore the beautiful Kannada script. Click any letter to hear its pronunciation and see an example word."
        />

        <Tabs defaultValue="vowels" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-card/60 border border-border/30 p-1 rounded-xl">
              <TabsTrigger
                value="vowels"
                className="font-inter text-sm px-6 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Vowels <span className="font-kannada ml-1.5 text-xs opacity-70">ಸ್ವರಗಳು</span>
              </TabsTrigger>
              <TabsTrigger
                value="consonants"
                className="font-inter text-sm px-6 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Consonants <span className="font-kannada ml-1.5 text-xs opacity-70">ವ್ಯಂಜನಗಳು</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="vowels">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4"
            >
              {vowels.map((v, i) => (
                <LetterCard key={v.letter} index={i} {...v} />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="consonants">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4"
            >
              {consonants.map((c, i) => (
                <LetterCard key={c.letter} index={i} {...c} />
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}