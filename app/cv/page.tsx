import { BackButton } from '@/components/BackButton';
import { DownloadButton } from '@/components/DownloadButton';
import { CVViewer } from '@/components/CVViewer';
import './cv.css';

export default function CVPage() {
  return (
    <div className="cv-page">
      <div className="page-header">
        <BackButton />
        <h2 style={{ fontFamily: 'var(--heading)', margin: 0 }}>Curriculum Vitae</h2>
        <div style={{ marginLeft: 'auto' }}>
          <DownloadButton href="/files/RushirajGadhviCV.pdf" filename="RushirajGadhviCV.pdf">Download</DownloadButton>
        </div>
      </div>
      <CVViewer src="/files/RushirajGadhviCV.pdf" />
    </div>
  );
}
