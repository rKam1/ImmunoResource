'use client';

import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import styles from './styles/Home.module.css';


const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className={styles.container}>
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className={styles.content}>
        {activeTab === 'home' && (
          <>
            <h1>Process Breakdown</h1>
            <br/>
            <br/>
            <h2>- Data Collection - </h2>
            <br/>
            <p>ImmunoResource uses a comprehensive de novo peptide sequencing approach with matched RNA-seq reads to identify non-canonical MHC-I-associated peptides (ncMAPs). 
              Raw data, including MHC-I immunopeptidome and RNA-seq files, were sourced from public repositories along with their HLA types. 
              Only samples with paired data advanced for analysis.</p>
            <br/>
            <h2>- Data Pre-Processing -</h2>
            <br/>
            <p>We convert raw RNA-seq data to a FASTQ format and processed for quality control using Trimmomatic v0.39. 
              The data is then aligned to the human reference genome (GRCh38) with gene annotations (Gencode v43) using the STAR aligner v2.7.1 with a two-pass alignment process. 
              Immunopeptidome data is converted to Mascot Generic Format (MGF) and sequenced with PEAKS De novo Search.
            </p>
            <br/>
            <h2>- pXg Pipeline -</h2>
            <br/>
            <p>Immunopeptidome data sequenced by PEAKS are refined using the pXg pipeline, incorporating genome-mapped and unmapped reads. 
              The peptide-spectrum matches (PSMs) are re-scored by Percolator, which then consider proteogenomic features like de novo Score, Read count, and Read Quality score. 
            </p>
            <br/>
            <h2>- FDR Estimation and Data Collection -</h2>
            <br/>
            <p>We employ a multi-stage false discovery rate (FDR) estimation approach using the Target-Decoy strategy. 
              Non-canonical PSMs with an FDR below 0.05 and canonical PSMs with an FDR below 0.01 are then collected. 
              Binding affinities are predicted by three models, and peptides identified as binders by at least one model are stored in the database. 
              This method aims to maximize the identification of ncMAPs while minimizing the risk of overlooking potential immunotherapeutic targets. 
              Only database search results mapped through the pXg process are retained.
            </p> 
            <br/>
            <h3>- Reference -</h3>
            <p>For detailed methodology, see the paper "pXg: Comprehensive Identification of Noncanonical MHC-I–Associated Peptides From De Novo Peptide Sequencing Using RNA-Seq Reads" 
            (doi: 10.1016/j.mcpro.2024.100743)
            </p> 
          </>
        )}
        {activeTab === 'page1' && (
          <>
            <h1>Using The Database</h1>
            <br/>
            <br/>
            <h2>- Basic Overview -</h2>
            <br/>
            <p>While ImmunoResource has a user-friendly interface, this page exists for clarifications on how to use the database. 
              If you want to view peptides identified from a sample origin, you can search by clicking on the chart in the Statistics section at the bottom of the Home page as shown in image (1). 
              Additionally, if you want to view only Canonical or Noncanonical Peptides, you can navigate through the chart as shown in image (2).
            </p>
            <br/>
            <img src="/Example.png" alt="Example" className={styles.image} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
