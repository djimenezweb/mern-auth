import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';

export default function About() {
  return (
    <a href="https://github.com/djimenezweb/mern-auth" target="_blank">
      <Button variant="outline">
        <FaGithub />
      </Button>
    </a>
  );
}
