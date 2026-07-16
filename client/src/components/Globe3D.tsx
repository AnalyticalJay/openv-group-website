import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();

      // Camera setup
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
      camera.position.z = 2.5;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Create sphere geometry for globe
      const geometry = new THREE.SphereGeometry(1, 64, 64);
      
      // Create canvas texture for globe
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw blue ocean
        ctx.fillStyle = '#0a1428';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw continents (simplified)
        ctx.fillStyle = '#1a3a52';
        ctx.fillRect(0, 300, 400, 200);
        ctx.fillRect(600, 250, 300, 250);
        ctx.fillRect(1200, 200, 400, 300);
        ctx.fillRect(1700, 350, 300, 150);

        // Add network nodes
        ctx.fillStyle = '#1FE084';
        const nodePositions = [
          [200, 350], [700, 400], [1300, 300], [1900, 400],
          [400, 250], [900, 200], [1500, 450], [200, 500]
        ];
        nodePositions.forEach(([x, y]) => {
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw connection lines
        ctx.strokeStyle = 'rgba(31, 224, 132, 0.4)';
        ctx.lineWidth = 2;
        for (let i = 0; i < nodePositions.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(nodePositions[i][0], nodePositions[i][1]);
          ctx.lineTo(nodePositions[i + 1][0], nodePositions[i + 1][1]);
          ctx.stroke();
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshPhongMaterial({ map: texture });
      const globe = new THREE.Mesh(geometry, material);
      scene.add(globe);

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.8);
      pointLight.position.set(5, 3, 5);
      scene.add(pointLight);

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(1.05, 64, 64);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x1FE084,
        transparent: true,
        opacity: 0.1,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(glow);

      // Animation loop
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);

        // Rotate globe
        globe.rotation.y += 0.0003;
        glow.rotation.y += 0.0002;

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current) return;

        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        glowMaterial.dispose();
        texture.dispose();
        renderer.dispose();
      };
    } catch (error) {
      console.error('Error initializing 3D globe:', error);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
