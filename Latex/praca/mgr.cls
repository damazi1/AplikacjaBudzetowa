%
%% Szablon do pracy magisterskiej
%% Tomasz Olas 2012
%
%
%
\NeedsTeXFormat{LaTeX2e}[1995/12/01]
\ProvidesClass{mgr}[2012/06/18 PracaMagisterska v1.4]

\DeclareOption*{\PassOptionsToClass{\CurrentOption}{report}}

\ProcessOptions

\LoadClass{report}

\usepackage{amssymb}
% styl polskich dokumentow
\usepackage[T1]{fontenc}
\usepackage[polish]{babel}
\usepackage[utf8]{inputenc}
\usepackage{lmodern}
\selectlanguage{polish}
\usepackage[polish]{varioref}
\usepackage[chapter]{totalcount}
\usepackage[nottoc]{tocbibind}
\usepackage{hyperref}
\usepackage{enumerate}
\hypersetup{
	colorlinks,
	citecolor=black,
	filecolor=black,
	linkcolor=black,
	urlcolor=black
}
\usepackage{nth}
\usepackage{pgfplotstable}
\usepackage{array}
\usepackage{csvsimple}
\usepackage{booktabs}
\usepackage{longtable}
\usepackage{tabularx}
\usepackage{listings}
\usepackage{placeins}
\usepackage{float}

%Set longtable caption to \textwidth (by default its 4in)
\LTcapwidth=\textwidth

%%% Code from Dr. Christian ------ for not using headers.----------------------
\pgfkeysifdefined{/pgfplots/table/output empty row/.@cmd}{
	% upcoming releases offer this more convenient option:
	\pgfplotstableset{
		empty header/.style={
			every head row/.style={output empty row},
		}
	}
}{
% versions up to and including 1.5.1 need this:
\pgfplotstableset{
	empty header/.style={
		typeset cell/.append code={%
			\ifnum\pgfplotstablerow=-1 %
			\pgfkeyssetvalue{/pgfplots/table/@cell content}{}%
			\fi
		}
	}
}
}
%%%-----------------------------------------------

%\lstloadlanguages{C++, Java, [Sharp]C}

\usepackage{color}
\definecolor{bluekeywords}{rgb}{0.13,0.13,1}
\definecolor{greencomments}{rgb}{0,0.5,0}
\definecolor{redstrings}{rgb}{0.9,0,0}
\definecolor{red}{rgb}{0.6,0,0} 
\definecolor{blue}{rgb}{0,0,0.6}
\definecolor{green}{rgb}{0,0.8,0}
\definecolor{cyan}{rgb}{0.0,0.6,0.6}
\usepackage{listings}
\lstset{
	language=c++,
	basicstyle=\footnotesize\ttfamily,
	numbers=left,
	numberstyle=\tiny,
	numbersep=5pt,
	tabsize=2,
	extendedchars=true,
	breaklines=true,
	frame=b,
	stringstyle=\color{blue}\ttfamily,
	showspaces=false,
	showtabs=false,
	xleftmargin=0pt,
	framexleftmargin=17pt,
	framexrightmargin=5pt,
	framexbottommargin=4pt,
	commentstyle=\color{green},
	showstringspaces=false,
	morekeywords={ abstract, event, new, struct,
		as, explicit, null, switch,
		base, extern, object, this,
		bool, false, operator, throw,
		break, finally, out, true,
		byte, fixed, override, try,
		case, float, params, typeof,
		catch, for, private, uint,
		char, foreach, protected, ulong,
		checked, goto, public, unchecked,
		class, if, readonly, unsafe,
		const, implicit, ref, ushort,
		continue, in, return, using,
		decimal, int, sbyte, virtual,
		default, interface, sealed, volatile,
		delegate, internal, short, void,
		do, is, sizeof, while,
		double, lock, stackalloc,
		else, long, static,
		enum, namespace, string,
		move, List, Optional,
		String },
	keywordstyle=\color{cyan},
	identifierstyle=\color{red},
	backgroundcolor=\color{white},
	   literate=
		{ą}{{\k{a}}}1
		{ć}{{\'c}}1
		{ę}{{\k{e}}}1
		{ł}{{\l{}}}1
		{ń}{{\'n}}1
		{ó}{{\'o}}1
		{ś}{{\'s}}1
		{ż}{{\.z}}1
		{ź}{{\'z}}1,
}

%\usepackage[pdftex]{graphicx}

% efekt wcięcia w pierwszym akapicie po tytule rozdziału, podrozdziału itd.
\usepackage{indentfirst}

% pakiet do obrotów
\usepackage{rotating}

% pakiet do ,,ladniejszych'' podpisow pod rysunkami i tabelami
\usepackage[footnotesize]{caption2}

%\setlength{\voffset}{-10mm}
%\setlength{\textheight}{210mm}

% Styl dla opisów do rysunków
\newcommand{\figdesc}[1]{%
{\usefont{T1}{phv}{m}{n}\fontsize{12pt}{12pt}\selectfont \slshape #1}}

\usepackage{hyphenat}
\newcommand{\dywiz}{\hyp{}}


\bibliographystyle{plain}

%\usepackage{ifthen}
%\RequirePackage[T1]{polski}
%\usepackage[latin2]{inputenc}
%\usepackage{indentfirst}
%\usepackage{wasysym}
\usepackage{fancyhdr}
%\usepackage{amsfonts}
%\usepackage{times}
\usepackage[left=3.5cm, top=2cm, right=2cm, bottom=2cm]{geometry}

%%
%\setlength{\voffset}{-1in}
%\setlength{\topmargin}{1.5cm}
%\setlength{\headheight}{1cm}
%\setlength{\headsep}{0.7cm}
%\setlength{\textheight}{24cm}

%\setlength{\hoffset}{-1in}
%\setlength{\oddsidemargin}{3cm}
%\setlength{\textwidth}{16cm}
%\setlength{\footskip}{1.5cm}
%%

%\setlength\arraycolsep{0.8ex}
%\setlength\arraycolsep{1.4\p@}
%\setlength\tabcolsep{1.4\p@}

\renewcommand{\baselinestretch}{1.5}

\pagestyle{fancy}
\renewcommand{\footrulewidth}{0.4pt}
\renewcommand{\headrulewidth}{0pt}
\fancyhead{} % clear all fields
\fancyfoot{} % clear all fields
\fancyfoot[LO]{\small{\slshape\nouppercase{\rightmark}}} 
\fancyfoot[RE]{\small{\slshape\nouppercase{\leftmark}}}
\fancyfoot[RO,LE]{\small{\thepage}} 
\fancypagestyle{plain}{
  \fancyhf{} % clear all header and footer fields
   \fancyfoot[RO,LE]{\small{\thepage}} % except the center
  \fancyfoot[LO]{\small{\slshape\nouppercase{\rightmark}}} 
  \fancyfoot[RE]{\small{\slshape\nouppercase{\leftmark}}}
  \renewcommand{\headrulewidth}{0pt} 
  \renewcommand{\footrulewidth}{0.4pt}
}

% formatowanie wielo (poziomowych) list wyliczeniowych
%\setlength\leftmargini   {25\p@}
%\setlength\leftmargin    {\leftmargini}
%\setlength\leftmarginii  {17\p@}
%\setlength\leftmarginiii {\leftmarginii}
%\setlength\leftmarginiv  {\leftmarginii}
%\setlength  \labelsep  {.5em}
%\setlength  \labelwidth{\leftmargini}
%\addtolength\labelwidth{-\labelsep}

%\def\@listI{\leftmargin\leftmargini
%             \parsep 0\p@ \@plus1\p@ \@minus\p@
%             \topsep 0\p@ \@plus2\p@ \@minus4\p@
%             \itemsep0\p@}
%\let\@listi\@listI
%\@listi
%\def\@listii {\leftmargin\leftmarginii
%               \labelwidth\leftmarginii
%               \advance\labelwidth-\labelsep
%               \topsep    0\p@ \@plus2\p@ \@minus\p@}
%\def\@listiii{\leftmargin\leftmarginiii
%               \labelwidth\leftmarginiii
%               \advance\labelwidth-\labelsep
%               \topsep    0\p@ \@plus\p@\@minus\p@
%               \parsep    \z@
%               \partopsep \p@ \@plus\z@ \@minus\p@}

%\renewcommand\labelitemi{\normalfont\bfseries --}
%\renewcommand\labelitemii{$\m@th\circ$}
%\renewcommand\labelitemiii{$\m@th\diamond$}



% \sloppy
%\frenchspacing
%\widowpenalty=10000
%\clubpenalty=10000

%  nazwy stałych elementów pracy
\renewcommand{\chaptername}{}
\renewcommand{\bibname}{Literatura}
\renewcommand{\figurename}{Rys.}

%  numeracja drugiego poziomu wyliczeń
%\renewcommand{\labelenumii}{\alph{enumii})}

%  numeracja rodziałów
\renewcommand\thechapter {\@arabic\c@chapter}
\renewcommand\thesection {\thechapter.\@arabic\c@section}
\renewcommand\thesubsection   {\thesection.\@arabic\c@subsection}
\renewcommand\thesubsubsection{\thesubsection.\@arabic\c@subsubsection}
\renewcommand\theparagraph    {\thesubsubsection.\@arabic\c@paragraph}
\renewcommand\thesubparagraph {\theparagraph.\@arabic\c@subparagraph}

% numeracja wzorów, rysunków i tabel
\renewcommand\theequation{\thechapter.\@arabic\c@equation}
\renewcommand\thefigure{\thechapter.\@arabic\c@figure}
\renewcommand\thetable{\thechapter.\@arabic\c@table}

%\def\fnum@figure{{\bf \figurename~\thefigure}}
%\def\fnum@table{{\bf\tablename~\thetable}}

\renewcommand*\captionlabeldelim{.}

%   formatowanie podpisów od tabelami i rysunkami
%\newdimen\captionwidth

%\newcommand\setcaptionwidth[1]{
%  \setlength\captionwidth{#1}}

%\setcaptionwidth{0.7\hsize}

%\def\captionsize{\normalsize}
%\newcommand\setcaptionsize[1]{
%  \def\captionsize{#1}
%}

%\def\captionlabelfont{\rmfamily}
%\newcommand\setcaptionlabelfont[1]{
%  \def\captionlabelfont{#1}
%}

%\def\captionstyle{}
%\newcommand\setcaptionstyle[1]{
%  \def\captionstyle{#1}
%}


%\renewcommand{\@makecaption}[2]{%
%  \vskip\abovecaptionskip
%  \sbox\@tempboxa{\captionsize {\captionlabelfont #1.} #2 }
%  \ifdim \wd\@tempboxa >\hsize
%  \global \@minipagefalse
%  \hb@xt@\hsize{\hfil
%  {\captionsize {\captionlabelfont #1.} 
%    \parbox[t]{\captionwidth}{\captionstyle #2}}
%  \hfil}%
%  \else
%  \global \@minipagefalse
%  \hb@xt@\hsize{\hfil\box\@tempboxa\hfil}%
%  \fi
%  \vskip\belowcaptionskip
%}

%  otoczenie tabeli
%\renewenvironment{table}
%{\setlength\abovecaptionskip{0\p@}%
%  \setlength\belowcaptionskip{10\p@}%
%  \@float{table}}
%{\end@float}

%  otoczenie rysunku
%\renewenvironment{figure}
%{\setlength\abovecaptionskip{0\p@}%
%  \setlength\belowcaptionskip{5\p@}%
%  \@float{figure}}
%{\end@float}

% formatowanie odległości numeru punktu od jego nazwy
\def\@seccntformat#1{\csname the#1\endcsname.\space}

\renewcommand\chapter{
  \if@openright\cleardoublepage\else\clearpage\fi
  \thispagestyle{plain}
  \vspace*{1\p@}
  \@startsection{chapter}{0}{\z@}%
  {-40\p@ }%\@plus -4\p@ \@minus -4\p@
  {12\p@ \@plus 4\p@ \@minus 4\p@}%
  {\normalfont\LARGE\bfseries\boldmath
    \rightskip=\z@ \@plus 8em\pretolerance=10000 }
}

\renewcommand\section{
  \@startsection{section}{1}{\z@}%
  {-18\p@ \@plus -4\p@ \@minus -4\p@}%
  {12\p@ \@plus 4\p@ \@minus 4\p@}%
  {\normalfont\Large\bfseries\boldmath
    \rightskip=\z@ \@plus 8em\pretolerance=10000 }}

\renewcommand\subsection{
  \@startsection{subsection}{2}{\z@}%
  {-18\p@ \@plus -4\p@ \@minus -4\p@}%
  {8\p@ \@plus 4\p@ \@minus 4\p@}%
  {\normalfont\large\bfseries\boldmath
    \rightskip=\z@ \@plus 8em\pretolerance=10000 }}

%\renewcommand\subsubsection{
%  \@startsection{subsubsection}{3}{\z@}%
%  {-18\p@ \@plus -4\p@ \@minus -4\p@}%
%  {-0.5em \@plus -0.22em \@minus -0.1em}%
%  {\normalfont\normalsize\bfseries\boldmath
%    \rightskip=\z@ \@plus 4em\pretolerance=10000 }}


\renewcommand\paragraph{
  \@startsection{paragraph}{4}{\z@}%
  {-12\p@ \@plus -4\p@ \@minus -4\p@}%
  {-0.5em \@plus -0.22em \@minus -0.1em}%
  {\normalfont\normalsize\itshape}}

% formatowanie odległości numeru punktu 
% od jego nazwy w nagłówkach strony
\renewcommand{\chaptermark}[1]{% 
\markboth{\thechapter.\space #1}{}}
\renewcommand{\sectionmark}[1]{
\markright{\thesection.\space #1}}


% formatowanie Literatury
\renewenvironment{thebibliography}[1]{
  \chapter*{\bibname\@mkboth{\bibname}{\bibname}}
  \addcontentsline{toc}{chapter}{\bibname} 
  \list{\@biblabel{\@arabic\c@enumiv}}{
    \settowidth\labelwidth{\@biblabel{#1}}%
    \leftmargin\labelwidth
    \advance\leftmargin\labelsep
    \@openbib@code
    \usecounter{enumiv}%
    \let\p@enumiv\@empty
    \renewcommand\theenumiv{\@arabic\c@enumiv}
  }
  \sloppy
  \clubpenalty4000
  \@clubpenalty \clubpenalty
  \widowpenalty4000%
  \sfcode`\.\@m
}

%% {\def\@noitemerr
%%   {\@latex@warning{Empty `thebibliography' environment}}%
%%   \endlist
%% }


\newcommand{\cAutor}{}
\newcommand{\cTytul}{}
\newcommand{\cTytulAng}{}
\newcommand{\cPromotor}{}
\newcommand{\cRok}{}
\newcommand{\cKierunek}{}
\newcommand{\cSpecjalnosc}{}
\newcommand{\cStudia}{}
\newcommand{\cPoziomStudiow}{}
\newcommand{\cNumerAlbumu}{}
\newcommand{\cRodzajPracy}{}

\newcommand{\autor}[1]{\renewcommand{\cAutor}{#1}}
\newcommand{\rodzajPracy}[1]{\renewcommand{\cRodzajPracy}{#1}}
\newcommand{\tytul}[1]{\renewcommand{\cTytul}{#1}}
\newcommand{\tytulAng}[1]{\renewcommand{\cTytulAng}{#1}}
\newcommand{\promotor}[1]{\renewcommand{\cPromotor}{#1}}
\newcommand{\rok}[1]{\renewcommand{\cRok}{#1}}
\newcommand{\kierunek}[1]{\renewcommand{\cKierunek}{#1}}
\newcommand{\studia}[1]{\renewcommand{\cStudia}{#1}}
\newcommand{\specjalnosc}[1]{\renewcommand{\cSpecjalnosc}{#1}}
\newcommand{\poziomStudiow}[1]{\renewcommand{\cPoziomStudiow}{#1}}
\newcommand{\numerAlbumu}[1]{\renewcommand{\cNumerAlbumu}{#1}}



% Tworzy stroną tytułową pracy magisterskiej
\newcommand{\stronaTytulowa}{%
{
    \thispagestyle{empty}
  

    \begin{center}
     
        \vfill
        
        \begin{figure}[!h]
        	\begin{center}
        		\includegraphics[width=1\textwidth]{images/logopcz_z_logo_wiisi.png}
        	\end{center}
        \end{figure}
        
        \vfill

        {\LARGE PRACA DYPLOMOWA \cRodzajPracy}

        \vfill
        \vspace{1.7cm}

        {\Large \bf \cTytul}\\
        \vspace{0.3cm}
        {\Large \it \cTytulAng}
    \end{center}

    \vfill
    \vfill

    \noindent
    \hspace*{0.515\textwidth} \makebox[0.5\textwidth][l]{\large \bf \cAutor} \\
    \hspace*{0.515\textwidth} \makebox[0.5\textwidth][l]{Nr albumu: \cNumerAlbumu} \\
    \hspace*{0.515\textwidth} \makebox[0.5\textwidth][l]{Kierunek: \cKierunek} \\
    \hspace*{0.515\textwidth} \makebox[0.5\textwidth][l]{Studia: \cStudia} \\
    \hspace*{0.515\textwidth} \makebox[0.5\textwidth][l]{Poziom studiów: \cPoziomStudiow} \\
    \hspace*{0.515\textwidth} \makebox[0.5\textwidth][l]{\large \bf Promotor pracy:} \\
    \hspace*{0.515\textwidth} \makebox[0.5\textwidth][l]{\large \bf \cPromotor}

    \vfill
    \vfill

    \noindent
    \mbox{Praca przyjęta dnia:} \\
    \mbox{} \\
    \mbox{Podpis promotora:} \\

    \vfill
    \vfill

    \begin{center}
        {\it Częstochowa, \cRok}
    \end{center}
}
\newpage
}


\endinput


% Local Variables:
% TeX-master: "mgr"
% End:
