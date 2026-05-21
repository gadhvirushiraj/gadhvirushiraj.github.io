---
abstract: Automated pose correction remains a significant challenge in AI-driven fitness
  systems, despite extensive research in activity recognition. This work presents
  PosePilot, a novel system that integrates pose recognition with real-time personalized
  corrective feedback, overcoming the limitations of traditional fitness solutions.
  Using Yoga, a discipline requiring precise spatio-temporal alignment as a case study,
  we demonstrate PosePilot's ability to analyze complex physical movements. Designed
  for deployment on edge devices, PosePilot can be extended to various at-home and
  outdoor exercises. We employ a Vanilla LSTM, allowing the system to capture temporal
  dependencies for pose recognition. Additionally, a BiLSTM with multi-head Attention
  enhances the model's ability to process motion contexts, selectively focusing on
  key limb angles for accurate error detection while maintaining computational efficiency.
  As part of this work, we introduce a high-quality video dataset used for evaluating
  our models. Most importantly, PosePilot provides instant corrective feedback at
  every stage of a movement, ensuring precise posture adjustments throughout the exercise
  routine. The proposed approach 1) performs automatic human posture recognition,
  2) provides personalized posture correction feedback at each instant which is crucial
  in Yoga, and 3) offers a lightweight and robust posture correction model feasible
  for deploying on edge devices in real-world environments.
arxiv: https://arxiv.org/abs/2505.19186
authors: Rushiraj Gadhvi*, Priyansh Desai*, Sidhharth
date: 2025-03-01 00:00:00+00:00
image: /images/projects/posepilot.png
paperurl: https://doi.org/10.1007/978-3-031-99568-2_17
preview_image: /images/paper-previews/2505.19186.png
status: Accepted, IbPRIA'25
title: 'PosePilot: Edge-AI Solution for Posture Correction in Physical Exercises'
---