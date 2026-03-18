/**
 * 앱 사이드바에서만 쓰는 아이콘.
 * 유지보수 시 메뉴 구조와 함께 이 파일만 보면 됨.
 */

import { useId } from 'react';

/** 사이드바 접혀 있을 때 로고 (logo-icon.svg) */
export function LogoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M12.0055 4.89374C13.958 2.94164 17.1233 2.9417 19.0758 4.89374C21.0284 6.84636 21.0284 10.0124 19.0758 11.965L19.0738 11.966C21.0262 13.9187 21.0264 17.0838 19.0738 19.0363C17.1215 20.9886 13.9562 20.9891 12.0035 19.0373C10.0508 20.9886 6.88637 20.9885 4.93419 19.0363C2.98185 17.084 2.98143 13.9187 4.93322 11.966L4.93224 11.965C2.97962 10.0124 2.97962 6.84636 4.93224 4.89374C6.88476 2.94167 10.05 2.94167 12.0026 4.89374L12.0035 4.89472L12.0055 4.89374Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TeamIcon({ className }: { className?: string } = {}) {
  const clipId = useId();
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M11.9989 2C13.0598 2 14.0772 2.42143 14.8273 3.17157C15.5775 3.92172 15.9989 4.93913 15.9989 6C15.9917 6.68998 15.8426 7.3711 15.5609 8.001L15.9989 8C16.2538 8.00028 16.4989 8.09788 16.6843 8.27285C16.8696 8.44782 16.9811 8.68695 16.9961 8.94139C17.011 9.19584 16.9282 9.44638 16.7646 9.64183C16.601 9.83729 16.369 9.9629 16.1159 9.993L15.9989 10H14.7359L15.9759 15.79C16.0311 16.0459 15.9838 16.3132 15.8441 16.5345C15.7045 16.7559 15.4836 16.9137 15.2289 16.974L15.1159 16.994L14.9989 17H8.99889C8.8597 17 8.72203 16.971 8.5947 16.9148C8.46736 16.8586 8.35317 16.7764 8.25941 16.6735C8.16566 16.5707 8.09442 16.4493 8.05025 16.3173C8.00608 16.1854 7.98995 16.0456 8.00289 15.907L8.02089 15.79L9.26089 10H7.99889C7.74401 9.99972 7.49886 9.90212 7.31352 9.72715C7.12819 9.55218 7.01666 9.31305 7.00172 9.05861C6.98678 8.80416 7.06957 8.55362 7.23316 8.35817C7.39675 8.16271 7.6288 8.0371 7.88189 8.007L7.99889 8H8.43689C8.22201 7.51586 8.08305 7.00148 8.02489 6.475L8.00489 6.216L7.99889 6C7.99889 4.93913 8.42032 3.92172 9.17046 3.17157C9.92061 2.42143 10.938 2 11.9989 2Z"
          fill="currentColor"
        />
        <path
          d="M18 18H6C5.73478 18 5.48043 18.1054 5.29289 18.2929C5.10536 18.4804 5 18.7348 5 19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.4903 21.0001 17.9636 20.8201 18.33 20.4942C18.6963 20.1682 18.9301 19.719 18.987 19.232L18.998 19.058C19.0059 18.922 18.9859 18.7859 18.9394 18.658C18.8928 18.53 18.8206 18.4129 18.7271 18.3138C18.6337 18.2148 18.521 18.1358 18.3959 18.0819C18.2709 18.0279 18.1362 18 18 18Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function BoardIcon({ className }: { className?: string } = {}) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path
        d="M17.997 4.17C18.5827 4.37638 19.09 4.75945 19.4487 5.26635C19.8075 5.77324 20.0001 6.37899 20 7V19C20 19.7956 19.6839 20.5587 19.1213 21.1213C18.5587 21.6839 17.7956 22 17 22H7C6.20435 22 5.44129 21.6839 4.87868 21.1213C4.31607 20.5587 4 19.7956 4 19V7C3.99989 6.37899 4.19251 5.77324 4.55128 5.26635C4.91005 4.75945 5.41728 4.37638 6.003 4.17C6.04684 5.20061 6.48713 6.17443 7.23194 6.88812C7.97674 7.6018 8.96846 8.00016 10 8H14C14.9912 8.00009 15.947 7.63219 16.6824 6.96761C17.4177 6.30303 17.8801 5.38911 17.98 4.403L17.997 4.17ZM15 15H9C8.73478 15 8.48043 15.1054 8.29289 15.2929C8.10536 15.4804 8 15.7348 8 16C8 16.2652 8.10536 16.5196 8.29289 16.7071C8.48043 16.8946 8.73478 17 9 17H15C15.2652 17 15.5196 16.8946 15.7071 16.7071C15.8946 16.5196 16 16.2652 16 16C16 15.7348 15.8946 15.4804 15.7071 15.2929C15.5196 15.1054 15.2652 15 15 15ZM15 11H9C8.73478 11 8.48043 11.1054 8.29289 11.2929C8.10536 11.4804 8 11.7348 8 12C8 12.2652 8.10536 12.5196 8.29289 12.7071C8.48043 12.8946 8.73478 13 9 13H15C15.2652 13 15.5196 12.8946 15.7071 12.7071C15.8946 12.5196 16 12.2652 16 12C16 11.7348 15.8946 11.4804 15.7071 11.2929C15.5196 11.1054 15.2652 11 15 11ZM14 2C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4C16 4.53043 15.7893 5.03914 15.4142 5.41421C15.0391 5.78929 14.5304 6 14 6H10C9.46957 6 8.96086 5.78929 8.58579 5.41421C8.21071 5.03914 8 4.53043 8 4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** 아래 방향 화살표 (토글 펼침 시). 접힘 시에는 rotate로 오른쪽 표시 */
export function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M12.7151 15.4653C12.3975 15.7654 11.9008 15.7654 11.5832 15.4653L5.8047 10.006C5.26275 9.49404 5.6251 8.58286 6.37066 8.58286L17.9276 8.58286C18.6732 8.58286 19.0355 9.49404 18.4936 10.006L12.7151 15.4653Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 사이드바 펼쳐져 있을 때 로고 옆 토글 아이콘 (접기) */
export function FoldLeftIcon({ className }: { className?: string }) {
  const clipId = useId();
  return (
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M24 14L2.82812 14M2.82812 14L6.32813 10.5M2.82812 14L6.32813 17.5"
          stroke="currentColor"
          strokeWidth="2.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 6.83203L12.5 6.83203"
          stroke="currentColor"
          strokeWidth="2.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 21H12.5"
          stroke="currentColor"
          strokeWidth="2.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="28" height="28" fill="white" transform="matrix(0 1 1 0 0 0)" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** 햄버거 메뉴 (모바일 헤더용) */
export function HamburgerIcon({ className }: { className?: string } = {}) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" />
      <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
      <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

/** 닫기(X) 버튼 (모바일 사이드바 등) */
export function CloseIcon({ className }: { className?: string } = {}) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 사이드바 접혀 있을 때 로고 옆 토글 아이콘 (펼치기) */
export function FoldRightIcon({ className }: { className?: string }) {
  const clipId = useId();
  return (
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M2.82812 13.832L24 13.832M24 13.832L20.5 17.332M24 13.832L20.5 10.332"
          stroke="currentColor"
          strokeWidth="2.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.82812 21L14.3281 21"
          stroke="currentColor"
          strokeWidth="2.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.82812 6.83203L14.3281 6.83203"
          stroke="currentColor"
          strokeWidth="2.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="28" height="28" fill="white" transform="matrix(0 1 1 0 0 0)" />
        </clipPath>
      </defs>
    </svg>
  );
}
