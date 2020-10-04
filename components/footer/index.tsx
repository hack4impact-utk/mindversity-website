import React from 'react';
import { Container, Wrapper, Row, Column, Link, Title, Image, Logo} from './style';
import fb from '../../public/icons/facebook.png'
import spotify from '../../public/icons/spotify.png'
import tiktok from '../../public/icons/tiktok.png'
import insta from '../../public/icons/instagram.png'
import twitter from '../../public/icons/twitter.png'
import logo from '../../public/mindversity-logo.png'

export default function Footer() {
    return (
        <Container>
            <Wrapper>
                <Row>
                    <Column>
                      <Logo src={logo}/>
                    </Column>
                    <Column>
                        <Title>About Us</Title>
                        <Link href="/">Mission</Link>
                        <Link href="/">Team</Link>
                        <Link href="/">Chapters</Link>
                    </Column>
                    <Column>
                        <Title>Peer Network</Title>
                        <Link href="/">Become an Advocate</Link>
                        <Link href="/">Get Support</Link>
                        <Link href="/">Forum</Link>
                        <Link href="/">Design</Link>
                    </Column>
                    <Column>
                        <Title>Resources</Title>
                        <Link href="/">MindVersity Blogs</Link>
                        <Link href="/">Community Blogs</Link>
                        <Link href="/">Write a Blog</Link>
                    </Column>
                    <Column>
                        <Title>Social Media</Title>
                        <Link href="https://www.facebook.com/MindVersed/"><Image src={fb} />Facebook</Link>
                        <Link href="https://twitter.com/MindVersity/media"><Image src={twitter} />Twitter</Link>
                        <Link href="https://www.instagram.com/mindversityorg"><Image src={insta} />Instagram</Link>
                        <Link href="https://open.spotify.com/show/1VDhTv2Y0K180XMf9NY23W?si=HhIdhDlHRU2ZOiiH4WFF9Q"><Image src={spotify} />Spotify</Link>
                        <Link href="/@mindversityorg"><Image src={tiktok} />Tiktok</Link>
                    </Column>
                </Row>
            </Wrapper>
        </Container>
    )
}

